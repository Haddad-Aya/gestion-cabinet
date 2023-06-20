package com.example.demo.dtos;

import lombok.Data;

import java.util.Date;
import java.util.List;

import com.example.demo.enums.Paye;
import com.example.demo.enums.TypeConsultation;

@Data
public class ConsultationDTO {

    private Long id;
    private String evolution;
    private Date dateConsultation;
    private String heureConsultation;
    private Paye paiment;
    private float prix;
    private TypeConsultation typeConsultation;
    private RendezVousDTO rendezVousDTO;
    private List<TraitementDTO> traitements;
    private List<FichierDTO> fichiers;

}
