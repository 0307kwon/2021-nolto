package com.wooteco.nolto.feed.ui;

import com.wooteco.nolto.auth.MemberAuthenticationPrincipal;
import com.wooteco.nolto.auth.UserAuthenticationPrincipal;
import com.wooteco.nolto.auth.ValidTokenRequired;
import com.wooteco.nolto.feed.application.CommentLikeService;
import com.wooteco.nolto.feed.application.CommentService;
import com.wooteco.nolto.feed.ui.dto.CommentRequest;
import com.wooteco.nolto.feed.ui.dto.CommentResponse;
import com.wooteco.nolto.feed.ui.dto.CommentWithReplyResponse;
import com.wooteco.nolto.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/feeds/{feedId:[\\d]+}/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentLikeService commentLikeService;

    @ValidTokenRequired
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@MemberAuthenticationPrincipal User user, @PathVariable Long feedId,
                                                         @RequestBody CommentRequest request) {
        CommentResponse response = commentService.create(user, feedId, request);
        return ResponseEntity.created(URI.create("/feeds/" + feedId + "/comments/" + response.getId())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<CommentWithReplyResponse>> findAllByFeedId(@UserAuthenticationPrincipal User user, @PathVariable Long feedId) {
        List<CommentWithReplyResponse> responses = commentService.findAllByFeedId(feedId, user);
        return ResponseEntity.ok(responses);
    }

    @ValidTokenRequired
    @PatchMapping("/{commentId:[\\d]+}")
    public ResponseEntity<CommentResponse> update(@MemberAuthenticationPrincipal User user,
                                                  @PathVariable Long feedId, @PathVariable Long commentId, @RequestBody CommentRequest request) {
        CommentResponse updatedComment = commentService.updateComment(commentId, request, user);
        return ResponseEntity.ok(updatedComment);
    }

    @ValidTokenRequired
    @DeleteMapping("/{commentId:[\\d]+}")
    public ResponseEntity<Void> deleteComment(@MemberAuthenticationPrincipal User user,
                                       @PathVariable Long feedId, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @ValidTokenRequired
    @PostMapping("/{commentId:[\\d]+}/like")
    public ResponseEntity<Void> addCommentLike(@MemberAuthenticationPrincipal User user,
                                            @PathVariable Long feedId, @PathVariable Long commentId) {
        commentLikeService.addCommentLike(commentId, user);
        return ResponseEntity.ok().build();
    }

    @ValidTokenRequired
    @PostMapping("/{commentId:[\\d]+}/unlike")
    public ResponseEntity<Void> deleteCommentLike(@MemberAuthenticationPrincipal User user,
                                              @PathVariable Long feedId, @PathVariable Long commentId) {
        commentLikeService.deleteCommentLike(commentId, user);
        return ResponseEntity.ok().build();
    }
}