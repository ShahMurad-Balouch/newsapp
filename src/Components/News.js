import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./spinner";
import PropTypes from 'prop-types';



export class News extends Component {
  static defaultProps = { 
    pageSize:3,
    country : 'us'
}
  static propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string,
  }



articles = [
      ]


capitalizeFLetter=(string)=> {
  return (string.charAt(0).toUpperCase() +
      string.slice(1));
}

  constructor(props) {
    super(props);
    console.log("hello i am the constructor");
    this.state = {
      articles: this.articles,
      loading: false,
      page : 1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFLetter(this.props.category)} - NewsMonkey`
  }

async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d964c8bcb8d54fc5953a2a3be7266299&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
let parsedData = await data.json()
console.log(parsedData);
this.setState({
  articles : parsedData.articles,
   totalResults:parsedData.totalResults,
  loading:false,
  })

}


prepage = async () => {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d964c8bcb8d54fc5953a2a3be7266299&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  this.setState({loading:true});
let parsedData = await data.json()
console.log(parsedData);
this.setState({
  page : this.state.page - 1, 
  articles : parsedData.articles,
loading:false
})
    console.log ('prepage')
}


nextpage = async () => {
  if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d964c8bcb8d54fc5953a2a3be7266299&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  this.setState({loading:true});
let parsedData = await data.json()
console.log(parsedData);
this.setState(
  {
    page : this.state.page + 1,
    articles : parsedData.articles,
    loading: false
  }  
  )
        console.log('next page')
}
}

// fetching more function


  render(){
    return(
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines on {this.capitalizeFLetter(this.props.category)}</h2>
        <Spinner/>
        <div className="row">
          {this.state.articles.map((element) => {
return <div className="col md-4 my-2" key='element.ul'>
 <NewsItems title={element.title? element.title.slice(0,22) : ""}
   description={element.description?element.description.slice(0,45):""}
   imageUrl={element.urlToImage}
   newsUrl={element.newsUrl}
   author={element.author}
   time={element.publishedAt}
   source={element.source.name}/>
</div>   
          })}     
          </div>  

          {/* these are 2 buttons next and previous */}
 <div className="d-grid gap-2 d-md-flex justify-content-md-end">
<button className="btn btn-dark me-md-2" disabled={this.state.page<=1} type="button" onClick={this.prepage}>&laquo; Previous</button>
<button className="btn btn-dark"  type="button" disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))} onClick={this.nextpage}>Next &raquo;</button>
</div> 
        

      </div>
    );
  }
}
export default News;
