package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.PatientDTO;
import com.example.demo.entities.Patient;

@Service
public class PatientMapperImpl {
    public PatientDTO fromPatient(Patient patient){
        PatientDTO patientDTO=new PatientDTO();
        BeanUtils.copyProperties(patient,patientDTO);
        return patientDTO;

    }

    public Patient fromPatientDTO(PatientDTO patientDTO){
        Patient patient=new Patient();
        BeanUtils.copyProperties(patientDTO,patient);
        return patient;

    }
}
