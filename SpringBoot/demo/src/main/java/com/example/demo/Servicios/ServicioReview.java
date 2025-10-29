package com.example.demo.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Modelos.Reviews;
import com.example.demo.Repositorios.RepositorioReview;

@Service
public class ServicioReview {
    @Autowired
    RepositorioReview repositorioReview;
    
    public Reviews guardarReviews(Reviews review){
        return repositorioReview.save(review);
    }
    public Optional<Reviews> obtenerporid(String idreview){
        return repositorioReview.findById(idreview);
    }
    public ArrayList<Reviews> obtenerReview(){
        return (ArrayList<Reviews>) repositorioReview.findAll();
    }
    public ArrayList<Reviews> obtenerporfecha(String fecha){
        return (ArrayList<Reviews>) repositorioReview.findByfechareview(fecha) ;
    }

    public String eliminarReview(String idreview){
        try {
            repositorioReview.deleteById(idreview);
            return "Reseña eliminado correctamente";
        } catch (Exception err) {
            // TODO: handle exception
            return "Error eliminando reseña" + err;
        }
    }
    
}
