import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import YTSearch from 'youtube-api-search'

import SearchBar from './components/search_bar.jsx'
import VideoList from './components/video_list.jsx'
import VideoDetail from './components/video_detail.jsx'


require('dotenv').load();

const API_KEY = process.env.API_KEY;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }

    render() {

        const videoSearch = _.debounce(
            (term) => {this.videoSearch(term)},
            300
        );

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <div className="row">
                    <VideoDetail video={this.state.selectedVideo}/>
                    <VideoList videos={this.state.videos}
                               onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
                </div>
            </div>
        )
    }

    videoSearch(term) {
        YTSearch(
            {key: API_KEY, term: term},
            (data) => {
                this.setState({
                    videos: data,
                    selectedVideo: data[0]
                });
            }
        );
    }


};

ReactDOM.render(
    <App />,
    document.querySelector('.container'));
