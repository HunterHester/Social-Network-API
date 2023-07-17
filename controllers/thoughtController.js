const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: "No thought with this ID"})
            }

            return res.status(200).json(thought);
            
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought (req, res) {
        try {
            const userVal = await User.findOne({ username: req.body.username });

            if (!userVal) {
                res.status(404).json("User does not exist");
                return;
            }

            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought } },
                { new: true }
            );

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
          }
    
          return res.status(200).json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such Thought exists' })
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted, but no users found',
                });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    //TODO: addReaction and removeReaction
};

module.exports = thoughtController;