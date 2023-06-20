package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.ConsultationDTO;
import com.example.demo.entities.Consultation;

@Service
public class ConsultationMapperImpl {
    public ConsultationDTO fromConsultation(Consultation consultation){
    	RendezVousMapperImpl impl= new RendezVousMapperImpl();
    	TraitementMapperImpl impl1= new TraitementMapperImpl();
    	FichierMapperImpl impl2= new FichierMapperImpl();
        ConsultationDTO consultationDTO=new ConsultationDTO();
        BeanUtils.copyProperties(consultation,consultationDTO);
        consultationDTO.setRendezVousDTO(impl.fromRendezVous(consultation.getRendezVous()));
        consultationDTO.setTraitements(impl1.fromTraitements(consultation.getTraitements()));
        consultationDTO.setFichiers(impl2.fromFichiers(consultation.getFichiers()));
        return consultationDTO;

    }

    public Consultation fromConsultationDTO(ConsultationDTO consultationDTO){
    	RendezVousMapperImpl impl= new RendezVousMapperImpl();
        Consultation consultation=new Consultation();
        BeanUtils.copyProperties(consultationDTO,consultation);
        consultation.setRendezVous(impl.fromRendezVousDTO(consultationDTO.getRendezVousDTO()));
        return consultation;

    }
}
