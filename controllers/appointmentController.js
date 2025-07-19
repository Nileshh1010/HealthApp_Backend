import Appointment from "../models/Appointment.js";

// Create appointment (patient)
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      reason,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error("Appointment creation error:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// Doctor accepts appointment
export const acceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "accepted";
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error("Accept appointment error:", err);
    res.status(500).json({ error: "Failed to accept appointment" });
  }
};

// Doctor reschedules appointment
export const rescheduleAppointment = async (req, res) => {
  try {
    const { newDate } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.date = newDate;
    appointment.status = "rescheduled";
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error("Reschedule appointment error:", err);
    res.status(500).json({ error: "Failed to reschedule appointment" });
  }
};

// Doctor completes appointment and adds advice
export const completeAppointment = async (req, res) => {
  try {
    const { advice } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "completed";
    appointment.advice = advice;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error("Complete appointment error:", err);
    res.status(500).json({ error: "Failed to complete appointment" });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email") // to show doctor details
      .sort({ date: -1 }); // latest first

    res.json(appointments);
  } catch (err) {
    console.error("Fetch patient appointments error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};