package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

import com.example.demo.enums.*;

@Entity
@Data 
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PATIENT")
public class Patient extends Utilisateur {
    @Enumerated(EnumType.STRING)
    private Sexe sexe;
    @Temporal(TemporalType.DATE)
    private Date dateNaissance;
    @Enumerated(EnumType.STRING)
    private Civilite civilite;
    private Long idCnam;
    private boolean archive;

}
