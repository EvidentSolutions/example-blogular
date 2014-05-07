package fi.evident.blogular.testutils;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.jetbrains.annotations.NotNull;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.Temporal;

public final class Matchers {

    private Matchers() { }

    @NotNull
    public static Matcher<LocalDateTime> aboutCurrentLocalDateTime() {
        return about(LocalDateTime.now(), Duration.ofSeconds(5));
    }

    @NotNull
    public static <T extends Temporal> Matcher <T> about(@NotNull T time, @NotNull Duration allowedDifference) {
        return new TypeSafeMatcher<T>() {
            @Override
            protected boolean matchesSafely(T item) {
                Duration duration = Duration.between(item, time).abs();
                return duration.compareTo(allowedDifference) < 0;
            }

            @Override
            public void describeTo(Description description) {
                description.appendText("about ").appendValue(time);
            }
        };
    }

    @NotNull
    public static Matcher<String> localDateTimeStringFor(@NotNull Matcher<LocalDateTime> matcher) {
        return new TypeSafeMatcher<String>() {
            @Override
            protected boolean matchesSafely(String item) {
                return matcher.matches(LocalDateTime.parse(item));
            }

            @Override
            public void describeTo(Description description) {
                description.appendText("String representation of ").appendDescriptionOf(matcher);
            }
        };
    }
}
