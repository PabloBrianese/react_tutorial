import './Blog.css';

function SidebarElement(props) {
  return (
    <li>
      {props.post.title}
    </li>
  );
}

function Post(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
}

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <SidebarElement
          key={post.id}
          post={post}
        />
      )}
    </ul>
  );
  const content = props.posts.map(post =>
    <Post
      key={post.id}
      title={post.title}
      content={post.content}
    />
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

// Finished