package com.example.vigilapp.exception;

public class CheckpointNotFoundException extends RuntimeException {
    public CheckpointNotFoundException(String message) {
        super(message);
    }
}