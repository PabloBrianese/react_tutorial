import './Blog.css';

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <li key={post.id}>  // different arrays can share keys
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map(post =>
    <div key={post.id}>  // different arrays can share keys
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

export {Blog, posts};