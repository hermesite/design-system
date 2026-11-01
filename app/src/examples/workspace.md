---
title: Workspace example
---

<div class="workspace">
  <section class="workspace-pane workspace-about bg-inverse fg-white">
    <header>
      <h2 class="h3">About</h2>
      <p>First panel: introduction and context. Its footer sticks to the bottom.</p>
    </header>
    <footer class="workspace-about-footer mt-auto small"><p>Version footer · <a href="./workspace">Link</a></p></footer>
  </section>
  <nav class="workspace-pane workspace-menu theme-primary" aria-label="Pages">
    <div class="workspace-menu-list">
      <section>
        <h2 class="h6 fg-3 text-uppercase px-5 pt-5 mb-3">Group</h2>
        <div class="list-group list-group-flush">
          <a class="list-group-item list-group-item-action active" href="./workspace" aria-current="page">First page</a>
          <a class="list-group-item list-group-item-action" href="./workspace">Second page</a>
          <a class="list-group-item list-group-item-action" href="./workspace">Third page</a>
        </div>
      </section>
    </div>
  </nav>
  <section class="workspace-pane workspace-stage" aria-label="Content">
    <div class="workspace-stage-content">
      <div class="workspace-stage-bar px-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="./workspace">Home</a></li>
            <li class="breadcrumb-divider"></li>
            <li class="breadcrumb-item active" aria-current="page">First page</li>
          </ol>
        </nav>
      </div>
      <div class="p-6">
        <h3>Stage</h3>
        <p>The stage holds the selected content; in a real project it is an iframe.</p>
      </div>
    </div>
  </section>
</div>
