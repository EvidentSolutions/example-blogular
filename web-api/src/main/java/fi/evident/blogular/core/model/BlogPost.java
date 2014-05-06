package fi.evident.blogular.core.model;

import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;

public final class BlogPost {

    @NotNull
    public String slug;

    @NotNull
    public String title;

    @NotNull
    public String author;

    @NotNull
    public LocalDateTime publishTime;

    @NotNull
    public String body;
}
