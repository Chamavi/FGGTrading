import crypto from 'crypto';


const sessionId = crypto.randomBytes(16).toString('base64');;

decodeURIComponent.cookie="id = " + sessionId + " SameSite=SameSite; Secure";

