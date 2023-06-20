package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.demo.dtos.MedecinDTO;
import com.example.demo.entities.Medecin;

@Service
public class MedecinMapperImpl {
    public MedecinDTO fromMedecin(Medecin medecin){
        MedecinDTO medecinDTO=new MedecinDTO();
        BeanUtils.copyProperties(medecin,medecinDTO);
        return medecinDTO;
    }
    public Medecin fromMedecinDTO(MedecinDTO medecinDTO){
        Medecin medecin=new Medecin();
        BeanUtils.copyProperties(medecinDTO,medecin);
        return medecin;
    }

}
