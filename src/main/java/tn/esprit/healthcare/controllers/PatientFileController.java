package tn.esprit.healthcare.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.healthcare.EmailPackage.EmailService;
import tn.esprit.healthcare.entities.PatientFile;
import tn.esprit.healthcare.services.IPatientFileService;
import tn.esprit.healthcare.services.IPatientFileServiceImpl;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
@AllArgsConstructor
@RestController
@RequestMapping("patient")
public class PatientFileController {

    //@Autowired
    IPatientFileService IPatientFileService;
  //  @Autowired
    IPatientFileServiceImpl iPatientFileServiceimpl;
    @Autowired

    EmailService emailService;
    @GetMapping("/all")
    public List<PatientFile> getAll(){
        String body="test";
        emailService.sendMail("moatez.oueslati@esprit.tn","invitation",body);
        return IPatientFileService.getAllPatientFile();

    }

    @GetMapping("{num}")

    public Optional<PatientFile> retrievePatientFile(@PathVariable Long num) {

        return  IPatientFileService.getPatientFile(num);

    }
    @PostMapping("add")
    public PatientFile addPatient(@RequestBody PatientFile patientFile, HttpServletResponse response) throws IOException {

        return IPatientFileService.addPatientFile(patientFile,response);

    }

    @DeleteMapping("delete/{num}")
    public void removePatientFile(@PathVariable Long num){

        IPatientFileService.removePatientFile(num);
    }
    @PutMapping("/update")
    public PatientFile updatePiste(@RequestBody PatientFile patientFile, HttpServletResponse response) throws IOException {

        return  IPatientFileService.updatePatientFile(patientFile,response);

    }

    @GetMapping(value = "/number/{state}")
    @ResponseBody
    public int nombredepatientsstatus(@PathVariable(name = "state")String state) {
        if (state.isEmpty()) {
            return 0;
        }

        return IPatientFileService.nombreselonstatus(state);
    }
    @GetMapping(value = "/findBystate/{state}")
    @ResponseBody
    public List<PatientFile> findByStatus(@PathVariable(name = "state")String state) {
        if (state.isEmpty()) {
            return null;
        }

        return iPatientFileServiceimpl.findByStatus(state);
    }

}
