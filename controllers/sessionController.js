const Mentor = require("../model/mentor");
const Session = require("../model/session");
const { format, parseISO } = require("date-fns");

const createSession = async (req, res) => {
  console.log("herrrrrrrrrr ", req.body);

  const {
    mentorId,
    mentor: { name: mentorName, email: mentorEmail },
    title,
    description,
    date,
    startTime,
    endTime,
    maxNumberOfAttendesTaking,
  } = req.body;

  console.log(mentorEmail, mentorName, title);

  if (
    !mentorId ||
    !mentorName ||
    !mentorEmail ||
    !title ||
    !description ||
    !date ||
    !startTime ||
    !endTime ||
    !maxNumberOfAttendesTaking
  ) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }

  try {
    // const existingMentorCount = await Mentor.countDocuments({ _id: mentorId });

    // if (existingMentorCount === 0) {
    //   console.log("Sending message");
    //   return res.json({
    //     success: false,
    //     message: "Mentor Doesn't exist",
    //   });
    // }

    const newSession = new Session({
      mentorId: mentorId,
      mentor: { name: mentorName, email: mentorEmail },
      title: title,
      description: description,
      date: format(parseISO(date), "yyyy-MM-dd"),
      startTime: startTime,
      endTime: endTime,
      maxNumberOfAttendesTaking: maxNumberOfAttendesTaking,
    });

    await newSession.save();
    res.json({
      success: true,
      message: "Session created sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const listOfSessions = await Session.find({});

    console.log(listOfSessions);
    res.json({
      success: true,
      sessions: listOfSessions,
      message: "Sessions accquired",
      count: listOfSessions.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Server error");
  }
};

const joinSession = async (req, res) => {
  const { menteeEmail, menteeId } = req.body;
  const id = req.params.id;

  console.log(menteeEmail, "joining session...");

  if (!menteeEmail || !menteeId) {
    return res.json({
      success: false,
      message: "Invalid Mentee",
    });
  }

  try {
    let session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const maxAttendees = session.maxAttendees || Infinity;
    const currentAttendees = session.attendesSigned.length;

    if (currentAttendees >= maxAttendees) {
      return res.status(200).json({
        success: false,
        message: "Maximum number of attendees reached",
      });
    }
    // Check if the email already exists in the attendesSigned array
    const emailExists = session.attendesSigned.some(
      (attendee) => attendee.email === menteeEmail
    );
    if (emailExists) {
      return res.status(200).json({
        success: false,
        message: "Mentee already joined",
      });
    }
    // Push the new attendee to the array locally
    session.attendesSigned.push({ email: menteeEmail });

    // Update the noOfAttendeesSigned count
    session.noOfAttendeesSigned = currentAttendees + 1;

    // Save the updated session
    const updatedSession = await session.save();
    console.log("Session joined");
    // Handle successful update
    return res.status(200).json({
      success: true,
      message: "Session updated successfully",
      session: updatedSession,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: error.message });
  }
};

const getSessionById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "Session Id required",
    });
  }

  try {
    const session = await Session.findById(id);
    console.log("session by id found");
    if (session) {
      console.log(session);
      return res.status(200).json({
        success: true,
        message: "Session send",
        session: session,
      });
    }
    console.log("session by id not found");
    return res.json({
      success: false,
      message: "Session Id required",
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "Server error",
      success: false,
    });
  }
};

const deleteSessions = async (req, res) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      res.json({
        message: "Sessioon not found",
        success: false,
      });
    }

    res.json({
      success: true,
      message: "Session deleted sucessfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      succes: false,
    });
  }
};
const getSessionsByMentorId = async (req, res) => {
  try {
    console.log("mentor id for session", req.params.id);

    const mentorSessions = await Session.find({ mentorId: req.params.id });

    res.status(200).json({
      message: "retrived",
      success: true,
      sessions: mentorSessions,
      count: mentorSessions.length,
    });
  } catch (e) {
    res.json({
      message: "error",
      success: false,
    });
  }
};

//start session
const startSession = async (req, res) => {
  console.log("session startedddd");
  const id = req.params.id;

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { $set: { isOngoing: true } },
      { new: true }
    );

    if (!updatedSession) {
      console.log("Session not found");
      return res.status(400).json({
        message: "Session not found",
        success: false,
      });
    }

    console.log("Session updated:", updatedSession);
    return res.status(200).json({
      message: "Session ongoing",
      success: true,
    });
  } catch (e) {
    console.error("Error updating document:", e);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//start session
const endCall = async (req, res) => {
  console.log("call end route resched");
  console.log("session ended");
  const id = req.params.id;

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { $set: { isOngoing: false } },
      { new: true }
    );

    if (!updatedSession) {
      console.log("Session not found");
      return res.status(400).json({
        message: "Session not found",
        success: false,
      });
    }

    console.log("Session updated:", updatedSession);
    return res.status(200).json({
      message: "Session ongoing",
      success: true,
    });
  } catch (e) {
    console.error("Error updating document:", e);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  createSession,
  getAllSessions,
  deleteSessions,
  getSessionById,
  joinSession,
  getSessionsByMentorId,
  startSession,
  endCall,
};
