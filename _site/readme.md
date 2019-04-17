
# Valensas Website

# Editing page content
Each Page of the website has a `.md` file. The content for the page can be edited within the front-matter of the markdown file. 

### Editing the Navigation 
You will find the navigation within the `config.yml` file. Each navigation item needs a link and text. 'active' state is automatically added for the current page.

```
nav:
  - text: Our Products
    link: /products/
  - text: Enterprise Solutions
    link: /enterprise-solutions/
  - text: Projects
    link: /projects/
  - text: Contact
    link: /contact/
```

### Editing the Footer 
You will find the footer content within the `config.yml` file. 
