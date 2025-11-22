
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, resultTitle, score } = request.body;

  if (!email) {
    return response.status(400).json({ error: 'Email is verplicht' });
  }

  const acUrl = process.env.ACTIVECAMPAIGN_URL;
  const acKey = process.env.ACTIVECAMPAIGN_KEY;

  if (!acUrl || !acKey) {
    return response.status(500).json({ error: 'Server configuratie ontbreekt (AC Credentials)' });
  }

  const headers = {
    'Api-Token': acKey,
    'Content-Type': 'application/json',
  };

  try {
    // STAP 1: Contact aanmaken of updaten (Sync)
    // -----------------------------------------
    const syncRes = await fetch(`${acUrl}/api/3/contact/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contact: {
          email: email,
          firstName: firstName,
          // Je kunt hier ook custom fields toevoegen als je die ID's weet
        },
      }),
    });

    const syncData = await syncRes.json();
    
    if (!syncRes.ok) {
      throw new Error(syncData.message || 'Fout bij contact sync');
    }

    const contactId = syncData.contact.id;

    // STAP 2: Bepaal de Tag Naam
    // -----------------------------------------
    // We maken een algemene tag én een specifieke resultaat tag
    const generalTagName = "Narcisme App: Deelnemer";
    const resultTagName = `Narcisme App: ${resultTitle}`; 
    
    // Helper functie om Tag ID te regelen (zoeken of aanmaken)
    const getOrCreateTagId = async (tagName) => {
      // A. Zoek de tag
      const searchUrl = `${acUrl}/api/3/tags?search=${encodeURIComponent(tagName)}`;
      const searchRes = await fetch(searchUrl, { headers });
      const searchData = await searchRes.json();
      
      let tagId = null;

      // Kijk of we een exacte match hebben
      if (searchData.tags && searchData.tags.length > 0) {
        const match = searchData.tags.find(t => t.tag === tagName);
        if (match) tagId = match.id;
      }

      // B. Als niet gevonden, maak nieuwe tag aan
      if (!tagId) {
        const createRes = await fetch(`${acUrl}/api/3/tags`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            tag: {
              tag: tagName,
              tagType: "contact",
              description: "Automatisch aangemaakt door Narcisme App"
            }
          })
        });
        const createData = await createRes.json();
        if (createData.tag) {
          tagId = createData.tag.id;
        }
      }
      return tagId;
    };

    // STAP 3: Tags toevoegen aan contact
    // -----------------------------------------
    // We doen dit parallel voor snelheid
    const tagNamesToApply = [generalTagName, resultTagName];
    
    await Promise.all(tagNamesToApply.map(async (name) => {
      try {
        const tagId = await getOrCreateTagId(name);
        if (tagId) {
          await fetch(`${acUrl}/api/3/contactTags`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              contactTag: {
                contact: contactId,
                tag: tagId
              }
            })
          });
        }
      } catch (err) {
        console.error(`Fout bij verwerken tag '${name}':`, err);
        // We laten de request niet falen als 1 tag mislukt, we loggen het alleen
      }
    }));

    // STAP 4: Note toevoegen met details (Optioneel, maar handig voor geschiedenis)
    // -----------------------------------------
    await fetch(`${acUrl}/api/3/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        note: {
          note: `Heeft quiz gedaan op ${new Date().toLocaleDateString()}. Score: ${score}/20.`,
          relid: contactId,
          reltype: 'Subscriber',
        },
      }),
    });

    return response.status(200).json({ success: true, message: 'Succesvol verwerkt' });

  } catch (error) {
    console.error('ActiveCampaign Backend Error:', error);
    return response.status(500).json({ error: 'Er ging iets mis bij de verwerking.' });
  }
}
