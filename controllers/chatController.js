import ChatMessage from "../models/ChatMessage.js";

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const messages = await ChatMessage.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving messages", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const newMessage = await ChatMessage.create({ sender, receiver, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};
