package com.wooteco.nolto.feed.ui.dto;

import com.wooteco.nolto.feed.domain.Feed;
import com.wooteco.nolto.feed.domain.Step;
import com.wooteco.nolto.tech.domain.Tech;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedRequest {
    @NotBlank
    private String title;

    private List<Tech> tech;

    @NotBlank
    private String content;

    @NotBlank
    private String step;

    @NotNull
    private boolean sos;

    private String storageUrl;
    private String deployedUrl;
    private String thumbnailUrl;

    public Feed toEntity() {
        return new Feed(
                this.tech, this.title, this.content, Step.of(step), this.sos, this.storageUrl, this.deployedUrl, this.thumbnailUrl
        );
    }
}