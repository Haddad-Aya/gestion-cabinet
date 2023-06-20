package com.example.demo.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.FactureDTO;
import com.example.demo.entities.Facture;

@Service
public class FactureMapperImpl {
    public FactureDTO fromFacture(Facture facture){
        FactureDTO factureDTO=new FactureDTO();
        BeanUtils.copyProperties(facture,factureDTO);
        return factureDTO;

    }

    public Facture fromFactureDTO(FactureDTO factureDTO){
        Facture facture=new Facture();
        BeanUtils.copyProperties(factureDTO,facture);
        return facture;

    }
}
