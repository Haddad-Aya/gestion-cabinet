package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "horaires")
public class Horaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique=true)
    private String jour;
    private String dateDebutPremS;
    private String dateFinPremS;
    private String dateDebutDeuS;
    private String dateFinDeuS;
    @ManyToOne
    private Medecin medecin;
}
