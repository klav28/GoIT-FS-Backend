const { BASE_URL } = process.env;

const createVerifyEmail = ({ email, verificationToken }) => {
  const verifyEmail = {
    to: email,
    subject: "Please Confirm Your Registration",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Follow this link to verify your e-mail address</a>`,
  };

  return verifyEmail;
};

export default createVerifyEmail;
