package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.healthcare.Entities.Appointment;
import tn.esprit.healthcare.Repositories.AppointmentRepository;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService{
    @Autowired
    private AppointmentRepository appointmentRepository;


    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment save(Appointment appointment) {
        appointmentRepository.save(appointment);
        return appointment;
    }

    @Override
    public Appointment findById(Long id_appointment) {
        if(appointmentRepository.findById(id_appointment).isPresent()) {
            return appointmentRepository.findById(id_appointment).get();
        }
        return null;
    }


    @Override
    public void delete(Long id_appointment) {
        Appointment appointment = findById(id_appointment);
        appointmentRepository.delete(appointment);
    }

}
