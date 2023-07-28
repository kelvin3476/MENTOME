const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newCommentContent = event.target.elements.commentContent.value;
    const newComment = {
        content: newCommentContent,
        // 필요한 경우 댓글 작성자 정보 등을 추가하세요
    };
    setComments([...comments, newComment]); // 새로운 댓글 추가
    event.target.reset(); // 폼 초기화
};

// ...

return (
    <Container>
        <div>
            <div>
                <h4>{comments.length}개의 댓글</h4>
                <div>
                    <textarea placeholder="댓글을 작성하세요" name="commentContent"></textarea>
                    <div>
                        <button onClick={handleCommentSubmit}>댓글 작성</button>
                    </div>
                </div>
            </div>
        </div>
    </Container>
);
