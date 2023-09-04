import {HttpError, sendMail} from "../helpers/index.js";
import {controlWrapper} from "../decorators/index.js";

const postNeedHelp = async (req, res) => {
    try {
        await sendMail({ subject: "Task Pro - need help",
            html: `<p>${req.body.message}</p>
                    <p>Send a reply to this address: 
                     <a href="mailto:${req.body.email}">${req.body.email}</a>
                    </p>`
        });

        return res.json({message: 'Message has been sent'});
    }catch (e) {
        HttpError(500, 'Something went wrong while sending the email')
    }
};

export default {
    postNeedHelp: controlWrapper(postNeedHelp),
}