module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8790e8f5a395faaf8d6e98a38e9b5e85'),
  },
});
