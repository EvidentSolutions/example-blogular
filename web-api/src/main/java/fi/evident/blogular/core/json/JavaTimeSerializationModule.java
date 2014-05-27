package fi.evident.blogular.core.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

public final class JavaTimeSerializationModule extends SimpleModule {
    public JavaTimeSerializationModule() {
        addSerializer(Duration.class, new JsonSerializer<Duration>() {
            @Override
            public void serialize(Duration value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeNumber(value.toMillis());
            }
        });

        addDeserializer(Duration.class, new JsonDeserializer<Duration>() {
            @Override
            public Duration deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
                return Duration.ofMillis(jp.getLongValue());
            }
        });

        addSerializer(LocalDate.class, new JsonSerializer<LocalDate>() {
            @Override
            public void serialize(LocalDate value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeString(value.toString());
            }
        });

        addDeserializer(LocalDate.class, new JsonDeserializer<LocalDate>() {
            @Override
            public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
                return LocalDate.parse(jp.getText().trim());
            }
        });

        addSerializer(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
            @Override
            public void serialize(LocalDateTime value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeString(value.toString());
            }
        });

        addDeserializer(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
            @Override
            public LocalDateTime deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
                return LocalDateTime.parse(jp.getText().trim());
            }
        });
    }
}
