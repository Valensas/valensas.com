require 'httparty'
require 'json'

module Jekyll
  class MediumPostDisplay < Generator
    safe true
    priority :high
    
    def generate(site)
      blog_collection = Jekyll::Collection.new(site, 'blog')
      site.collections['blog'] = blog_collection
      url= "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40bitronit"
      json = HTTParty.get(url).body
      parsedJson = JSON.parse(json)
      parsedJson["items"].each do |e|
        title = e["title"]
        path = "./_blog/" + title.split.first.gsub(/[^0-9a-z ]/i, '') + "_" + title.split.last.gsub(/[^0-9a-z ]/i, '') + ".md"
        path = site.in_source_dir(path)
        doc = Jekyll::Document.new(path, { :site => site, :collection => blog_collection })
        doc.data['title'] = title;
        doc.data['date'] = e["pubDate"];
        doc.data['post_url'] = e["guid"];
        doc.data['image'] = e["thumbnail"];
        blog_collection.docs << doc
      end
    end
  end
end