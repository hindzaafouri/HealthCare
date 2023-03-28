package tn.esprit.healthcare.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.healthcare.Entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
