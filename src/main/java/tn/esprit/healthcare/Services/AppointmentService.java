package tn.esprit.healthcare.Services;

import tn.esprit.healthcare.Entities.Appointment;

import java.util.List;

public interface AppointmentService {
    public List<Appointment> findAll();

    public Appointment save(Appointment appointment);

    public Appointment findById(Long id_appointment);

    public void delete(Long id_appointment);
}
