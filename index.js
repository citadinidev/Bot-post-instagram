
const axios = require('axios');

const pageAccessToken = "PAGE_ACCESS_TOKEN"; // TOKEN GERADO PARA A API: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/content-publishing
const instagramAccountId = "INSTAGRAM_ACCOUNT_ID"; // ID DA SUA PÁGINA DO INSTAGRAM (A PÁGINA PRECISA SER UMA "CONTA COMERCIAL DO INSTAGRAM"). MAIS DETALHES NO LINK ACIMA

uploadMedia("https://placehold.co/512", "Aqui está uma descrição para a imagem!", false); // uploadMedia("URL DA IMAGEM", "DESCRIÇÃO DA IMAGEM", TRUE = POSTAR NOS STORIES; FALSE = POSTAR NO FEED)


async function uploadMedia(mediaUrl, caption, isStories) {
    try {
        const apiUrlBase = `https://graph.facebook.com/v20.0/${instagramAccountId}`

            const mediaObjectResponse = await axios.post(
                `${apiUrlBase}/media`,
                {
                    [`image_url`]: mediaUrl,
                    caption: caption,
                },
                {
                    params: {
                        media_type: isStories ? "STORIES" : "",
                        access_token: pageAccessToken,
                    },
                }
            );

            const mediaObjectId = mediaObjectResponse.data.id;

            const publishResponse = await axios.post(
                `${apiUrlBase}/media_publish`,
                {
                    creation_id: mediaObjectId,
                },
                {
                    params: {
                        access_token: pageAccessToken,
                    },
                }
            );

            console.log('Imagem publicada com sucesso:', publishResponse.data);

    } catch (error) {
        console.error('Erro ao publicar imagem:', error.response ? error.response.data : error.message);
    }
}
