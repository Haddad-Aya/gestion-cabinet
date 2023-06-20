package com.example.demo.dtos;


import lombok.Data;

import java.util.Date;

import com.example.demo.enums.StatusRDV;

@Data
public class RendezVousDTO {
    private Long id;
    private Date dateRendezVous;
    private String heureDebut;
    private StatusRDV status;
    private PatientDTO patient;
    
}
