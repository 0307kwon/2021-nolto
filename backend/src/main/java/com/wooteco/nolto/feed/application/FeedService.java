package com.wooteco.nolto.feed.application;

import com.wooteco.nolto.NotFoundException;
import com.wooteco.nolto.feed.domain.Feed;
import com.wooteco.nolto.feed.domain.FeedRepository;
import com.wooteco.nolto.feed.domain.Feeds;
import com.wooteco.nolto.feed.domain.FilterStrategy;
import com.wooteco.nolto.feed.ui.dto.FeedCardResponse;
import com.wooteco.nolto.feed.ui.dto.FeedRequest;
import com.wooteco.nolto.feed.ui.dto.FeedResponse;
import com.wooteco.nolto.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FeedService {

    private final FeedRepository feedRepository;

    public Long create(User user, FeedRequest request) {
        Feed feed = request.toEntity().writtenBy(user);
        Feed savedFeed = feedRepository.save(feed);
        return savedFeed.getId();
    }

    public FeedResponse findById(User user, Long feedId) {
        Feed feed = findEntityById(feedId);
        User author = feed.getAuthor();
        boolean liked = user.isLiked(feed);
        return FeedResponse.of(author, feed, liked);
    }

    public Feed findEntityById(Long feedId) {
        return feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드를 찾을 수 없습니다."));
    }

    public List<FeedCardResponse> findHotFeeds() {
        Feeds feeds = new Feeds(feedRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
        return FeedCardResponse.toList(feeds.sortedByLikeCount(10));
    }

    public List<FeedCardResponse> findAll(String filter) {
        FilterStrategy strategy = FilterStrategy.of(filter);
        Feeds feeds = new Feeds(feedRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
        return FeedCardResponse.toList(feeds.filter(strategy));
    }
}
