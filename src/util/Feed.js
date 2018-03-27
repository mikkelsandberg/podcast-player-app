import util from 'util';
import xml2js from 'xml2js';
import request from 'request';

// eslint-disable-next-line 
String.prototype.splice = function(start, delCount, newSubStr) {
  return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

const Feed = {
  load(url, callback) {
    const $ = this;

    request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0',
        accept: 'text/html,application/xhtml+xml'
      },
      pool: false,
      followRedirect: true

    }, (error, response, xml) => {
      if (!error && response.statusCode === 200) {
        const parser = new xml2js.Parser({ trim: false, normalize: true, mergeAttrs: true });
        parser.addListener("error", function (err) {
          callback(err, null);
        });
        parser.parseString(xml, function (err, result) {

          callback(null, $.parser(result));
          //console.log(JSON.stringify(result.rss.channel));
        });

      } else {
        this.emit('error', new Error('Bad status code'));
      }
    })
  },

  parser(json) {
    let channel = json.rss.channel;
    const rss = { items: [] };

    if (util.isArray(json.rss.channel))
      channel = json.rss.channel[0];

    if (channel.title) {
      rss.title = channel.title[0];
    }
    if (channel.description) {
      rss.description = channel.description[0];
    }
    if (channel.link) {
      rss.url = String(channel.link[0]).split(/(http:)/)[2];
    }

    // add rss.image via @dubyajaysmith
    if (channel.image) {
      rss.image = String(channel.image[0].url).splice(4, 0 , 's');
    }

    if (!rss.image && channel["itunes:image"]) {
      rss.image = channel['itunes:image'][0].href
    }

    if (channel.item) {
      if (!util.isArray(channel.item)) {
        channel.item = [channel.item];
      }
      channel.item.forEach(val => {
        const obj = {};

        obj.title = !util.isNullOrUndefined(val.title) ? val.title[0] : '';
        obj.description = !util.isNullOrUndefined(val.description) ? val.description[0] : '';
        obj.url = obj.link = !util.isNullOrUndefined(val.link) ? String(val.link[0]).splice(4, 0 , 's') : '';

        if (val['itunes:subtitle']) {
          obj.itunes_subtitle = val['itunes:subtitle'][0];
        }
        if (val['itunes:summary']) {
          obj.itunes_summary = val['itunes:summary'][0];
        }
        if (val['itunes:author']) {
          obj.itunes_author = val['itunes:author'][0];
        }
        if (val['itunes:explicit']) {
          obj.itunes_explicit = val['itunes:explicit'][0];
        }
        if (val['itunes:duration']) {
          obj.itunes_duration = val['itunes:duration'][0];
        }
        if (val['itunes:season']) {
          obj.itunes_season = val['itunes:season'][0];
        }
        if (val['itunes:episode']) {
          obj.itunes_episode = val['itunes:episode'][0];
        }
        if (val['itunes:episodeType']) {
          obj.itunes_episodeType = val['itunes:episodeType'][0];
        }
        if (val.pubDate) {
          //lets try basis js date parsing for now
          obj.created = Date.parse(val.pubDate[0]);
        }
        if (val['media:content']) {
          obj.media = val.media || {};
          obj.media.content = val['media:content'];
        }
        if (val['media:thumbnail']) {
          obj.media = val.media || {};
          obj.media.thumbnail = val['media:thumbnail'];
        }
        if (val.enclosure) {
          obj.enclosures = [];
          if (!util.isArray(val.enclosure))
            val.enclosure = [val.enclosure];
          val.enclosure.forEach(function (enclosure) {
            const enc = {};
            for (var x in enclosure) {
              enc[x] = enclosure[x][0];
            }
            obj.enclosures.push(enc);

            obj.enclosures[0].url = String(obj.enclosures[0].url).splice(4, 0, 's');
          });

        }
        rss.items.push(obj);

      });

    }
    return rss;
  },

  read(url, callback) {
    return this.load(url, callback);
  }
}

export default Feed;