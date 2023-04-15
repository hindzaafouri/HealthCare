package tn.esprit.healthcare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.healthcare.Entities.Appointment;
import tn.esprit.healthcare.Repositories.AppointmentRepository;
import tn.esprit.healthcare.Services.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;




    @GetMapping("/liste")
    public ResponseEntity<List<Appointment>> getAppointments(){
        return new ResponseEntity<>(appointmentService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/liste")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointment){
        Appointment appointmentO =appointmentService.save(appointment);
        return new ResponseEntity<Appointment>(appointmentO, HttpStatus.OK);
    }

    @GetMapping("/liste/{id_appointment}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable("id_appointment")Long id_appointment){
        Appointment appointment =appointmentService.findById(id_appointment);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @DeleteMapping("/liste/{id_appointment}")
    public ResponseEntity<String> deleteAppointment(@PathVariable("id_appointment")Long id_appointment){
        appointmentService.delete(id_appointment);
        return new ResponseEntity<String>("Appointment is deleted successufully!", HttpStatus.OK);
    }

    @PutMapping("/update/{id_appointment}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id_appointment, @RequestBody Appointment appointment){
        Appointment appointmentO = appointmentService.findById(id_appointment);


        if(appointmentO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            appointmentO.setDate(appointment.getDate());
            appointmentO.setHeure(appointment.getHeure());
            appointmentO.setStateAppointment(appointment.getStateAppointment());
            appointmentO.setUsers(appointment.getUsers());
            return new ResponseEntity<>(appointmentService.save(appointmentO), HttpStatus.CREATED);
        }catch(DataAccessException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
