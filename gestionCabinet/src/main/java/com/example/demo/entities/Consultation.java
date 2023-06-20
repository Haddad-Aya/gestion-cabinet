package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

import com.example.demo.enums.Paye;
import com.example.demo.enums.TypeConsultation;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consultations")
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String evolution;
    @Temporal(TemporalType.DATE)
    private Date dateConsultation;
    private String heureConsultation;
    @Enumerated(EnumType.STRING)
    private Paye paiment;
    private float prix;
    @Enumerated(EnumType.STRING)
    private TypeConsultation typeConsultation;
    @OneToOne(fetch = FetchType.EAGER)
    private RendezVous rendezVous;
    @OneToMany(fetch = FetchType.EAGER)
    private Collection<Fichier> fichiers;
    @OneToMany(fetch = FetchType.EAGER)
    private Collection<Traitement> traitements;
    
}
