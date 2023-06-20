package com.example.demo.mappers;


import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.RendezVousDTO;
import com.example.demo.entities.RendezVous;

@Service
public class RendezVousMapperImpl {

	
    public RendezVousDTO fromRendezVous(RendezVous rendezVous){
    	PatientMapperImpl impl= new PatientMapperImpl();
        RendezVousDTO rendezVousDTO=new RendezVousDTO();
        BeanUtils.copyProperties(rendezVous,rendezVousDTO);
        rendezVousDTO.setPatient(impl.fromPatient(rendezVous.getPatient()));
        return rendezVousDTO;

    }

    public RendezVous fromRendezVousDTO(RendezVousDTO rendezVousDTO){
    	PatientMapperImpl impl= new PatientMapperImpl();
        RendezVous rendezVous=new RendezVous();
        BeanUtils.copyProperties(rendezVousDTO,rendezVous);
        rendezVous.setPatient(impl.fromPatientDTO(rendezVousDTO.getPatient()));
        return rendezVous;

    }

}
