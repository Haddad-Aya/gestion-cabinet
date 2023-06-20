package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.HoraireDTO;
import com.example.demo.entities.Horaire;

@Service
public class HoraireMapperImpl {
    public HoraireDTO fromHoraire(Horaire horaire){
    	MedecinMapperImpl impl= new MedecinMapperImpl();
        HoraireDTO horaireDTO=new HoraireDTO();
        BeanUtils.copyProperties(horaire,horaireDTO);
        horaireDTO.setMedecinDTO(impl.fromMedecin(horaire.getMedecin()));
        return horaireDTO;

    }

    public Horaire fromHoraireDTO(HoraireDTO horaireDTO){
    	MedecinMapperImpl impl= new MedecinMapperImpl();
        Horaire horaire=new Horaire();
        BeanUtils.copyProperties(horaireDTO,horaire);
        horaireDTO.setMedecinDTO(impl.fromMedecin(horaire.getMedecin()));
        return horaire;

    }}
