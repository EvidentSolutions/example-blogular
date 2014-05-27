package fi.evident.blogular.core.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class JavaTimeSerializationModuleTest {

    @NotNull
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void registerModule() {
        objectMapper.registerModule(new JavaTimeSerializationModule());
    }

    @Test
    public void serializeDurations() throws Exception {
        assertThat(objectMapper.writeValueAsString(Duration.ofMillis(42)), is("42"));
        assertThat(objectMapper.writeValueAsString(Duration.ofMinutes(42)), is("2520000"));
    }

    @Test
    public void deserializeDurations() throws Exception {
        assertThat(objectMapper.readValue("42", Duration.class), is(Duration.ofMillis(42)));
    }

    @Test
    public void serializeLocalDates() throws Exception {
        assertThat(objectMapper.writeValueAsString(LocalDate.of(2004, 3, 10)), is("\"2004-03-10\""));
    }

    @Test
    public void deserializeLocalDates() throws Exception {
        assertThat(objectMapper.readValue("\"2004-03-10\"", LocalDate.class), is(LocalDate.of(2004, 3, 10)));
    }

    @Test
    public void serializeLocalDateTimes() throws Exception {
        assertThat(objectMapper.writeValueAsString(LocalDateTime.of(2004, 3, 10, 14, 30, 12)), is("\"2004-03-10T14:30:12\""));
    }

    @Test
    public void deserializeLocalDateTimes() throws Exception {
        assertThat(objectMapper.readValue("\"2004-03-10T14:30:12\"", LocalDateTime.class), is(LocalDateTime.of(2004, 3, 10, 14, 30, 12)));
    }
}
