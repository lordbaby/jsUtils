// npm init -y   =>  cnpm install =>  node app || node app 你的ID

const http = require("http")
const fs = require("fs")
const parse = require("url").parse
const Progress = require("progress")

const targetURL = "http://www.mzitu.com"

const targetURLs = []
let urls = []
let titles = []
const overtimes = []
const errors = []

const request = (url) => {
	return new Promise((resolve, reject) => {
		http.request({
			hostname: parse(url).hostname,
			path: parse(url).pathname,
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
			}
		}, (res) => {
			const buffer = []

			res.on("data", (chunk) => {
				buffer.push(chunk)
			})

			res.on("end", () => {
				resolve(Buffer.concat(buffer).toString())
			})

		}).on("error", (error) => {
			reject(error)
		}).end()
	})
}

const requestImage = (url, path) => {
	return new Promise((resolve, reject) => {
		http.request({
			hostname: parse(url).hostname,
			path: parse(url).pathname,
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"
			}
		}, (res) => {
			if (res.statusCode === 404) {
				reject(new Error("妹纸不存在"))

				return
			}

			const filename = url.match(/\w+\.\w+$/g)[0]

			res.pipe(fs.createWriteStream(`${path}/${filename}`))

			resolve()
		}).on("error", () => {
			reject(new Error("妹纸超时跑掉了"))
		}).end()
	})
}

const getTargetURLs = (url) => {
	return new Promise((resolve, reject) => {
		console.log()
		console.log(`\u001b[91m 正在分析页面。。。\u001b[39m`)

		request(url).then((html) => {
			let targetHTML = html.match(/<(ul)\sid="pins(.|\n)+<\/ul>/)[0]

			titles = targetHTML.match(/[\u4e00-\u9fff]+[^<']+<\/a/g) // 文件夹名
			urls = [... new Set(targetHTML.match(/http[^\sb]+\d+/g))] // 目标 URL 数组

			titles = titles.map((title) => {
				return title.replace("</a", "")
			})

			console.log()
			console.log(`\u001b[91m 分析完成~~ 共有${urls.length}种不同类型的妹纸等待捕获哦~\u001b[32m`)
			console.log()

			resolve({
				urls,
				titles
			})
		})
	})
}

const createDir = (path) => {
	return new Promise((resolve, reject) => {
		fs.stat(path, (error, stats) => {
			if (error && error.code === "ENOENT") {
				fs.mkdir(path, () => {
					resolve()
				})
			} else {
				resolve()
			}
		})
	})
}

const bbb = () => {
	const url = urls.pop()

	console.log()
	console.log(` 开始捕获 ${titles[urls.length]}`)

	let path = `${__dirname}/images/${titles[urls.length]}`

	Promise.all([createDir(path), analyseMeizhi(url)]).then(([, aa]) => {
		getMeizhi(aa, path)
	})
}

const analyseMeizhi = (url) => {
	return new Promise((resolve, reject) => {
		request(url).then((html) => {
			let total = + html.match(/page(.|\r|\n)+raqu/)[0].match(/<span>\d+<\/span>/g).pop().replace(/[^\d]/g, "")

			let aa = []

			console.log()
			console.log(` 共 ${total} 只妹纸~~`)
			console.log()

			while (total) {
				aa.unshift(`${url}/${total}`)

				total--
			}

			aa[0] = aa[0].slice(0, aa[0].length - 2)

			resolve(aa)
		})
	})
}

const getMeizhi = (aa, path) => {
	const total = aa.length
	const count = Math.ceil(total / 10)

	let index = 0
	let bar = new Progress(" :bar", {
		total: total,
		width: 50
	})

	const complete = (bar) => {
		bar.tick()

		if (bar.complete) {
			if (urls.length) {
				bbb()
			} else {
				const endTime = Date.now()

				console.log()
				console.log(`\u001b[36m 本次抓妹纸共耗时 ${(endTime - startTime) / 1000}秒`)

				if (errors.length) {
					console.log()
					console.log(` ${errors.length}个妹纸意外失踪`)
				}

				if (overtimes.length) {
					console.log()
					console.log(` ${overtimes.length}个妹纸超时跑掉`)
				}
			}
		}
	};

	(function ccc () {
		const sectionURL = aa.slice(10 * index, 10 * (index + 1))

		while (sectionURL.length) {
			request(sectionURL.shift()).then((html) => {
				let imgURL = html.match(/<(?=img)[^>]+>/g)[0]
				let str = imgURL.match(/http[^'\s]+\.(jpg|jpeg|png)/g)[0].replace(/("|')/g, "")

				requestImage(str, path).then(() => {
					complete(bar)
				}).catch((error) => {
					if (error.message === "妹纸不存在") {
						errors.push(error)
					}

					if (error.message === "妹纸超时跑掉了") {
						overtimes.push(error)
					}

					complete(bar)
				})
			})
		}

		if (++ index < count) {
			ccc()
		}

	})()
}

const singleMeizhi = (id) => {
	const url = `http://www.mzitu.com/${id}`

	Promise.all([createDir(`${__dirname}/images`), request(url)]).then(([, html]) => {
		const title = html.match(/<title>(.+)<\/title>/)[1].split("-")[0].trim()

		urls.push(url)

		titles.push(title)

		bbb()
	})
}

const startTime = Date.now()

const id = process.argv.slice(2)[0]

id ? singleMeizhi(id) : Promise.all([createDir(`${__dirname}/images`), getTargetURLs(targetURL)]).then(() => {
	bbb()
})
