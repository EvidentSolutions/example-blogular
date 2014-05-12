package fi.evident.blogular.web.controllers;

import fi.evident.dalesbred.NonUniqueResultException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler
    public ResponseEntity<?> dalesbredResultNotFoundHandler(NonUniqueResultException exception) {
        // Silly hack, Dalesbred should have better API
        if (exception.getMessage().equals("Expected unique result but got 0 rows."))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
