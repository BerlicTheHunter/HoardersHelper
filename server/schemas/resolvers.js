const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models/index');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("Running ME");
      console.log(context.user);
      if (context.user) {
        console.log(context.user._id)
        const userData = await User.findOne({ _id: context.user._id })
        .select(
          "-__v -password"
        );
        console.log (userData);
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async ( parent, {username,email,password}) =>{
      console.log("Tried Resolver")
      const user = await User.create({username,email,password});
      const token = signToken(user);
      return{token, user};
    },
    login: async (parent, { email, password }) => {
      console.log("Tried Login")
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveMTGCard: async (parent, {MTGCardData}, context) => {
      console.log("save card running");
      if (context.user) {
        console.log("save tried")
        console.log(MTGCardData)
        console.log(context.user)
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id },
          { $push: { mtgCard: MTGCardData} },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeMTGCard: async (parent, { MTGCardId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { myMTGCards: { id } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
