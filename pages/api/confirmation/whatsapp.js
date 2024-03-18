const sendConfirmation = () => {
    fetch("https://graph.facebook.com/v15.0/111767975081838/messages", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer EABQlMczzRMIBAOLb7cORqeCdtzzeuuOubphFqxcmiZCaEqAfvijJp1ugrhVZACDbs7HL4PQa4fZAIDAKxdkViL1FF3PnmASFfdMIDXf51MycRA8ScthLkXVgsEdXVhYffoHpTtRYrOEqTJjT3366MZBf5P3EPn3cSNZCAJ1Sqi9uCIc7qexyaWKRVpWl1zohJXpzMfIM4nNIR7VLJmgxwvSjefVkmoGsZD",
        "Content-Type": "application/json",
      },
      // body: '{ "messaging_product": "whatsapp", "to": "15555555555", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }',
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "918459009103",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      }),
    });
    // .then((res) => console.log(res))
    // .catch((err) => console.error(err));
  };
  
  export default sendConfirmation;
  