import React, {useEffect, useState} from "react"
import MarkdownEdit from "./MarkdownEdit"
import {Button, Input, message, Select} from "antd"
import {IconFont, judgeNull} from "../utils"
import {handle} from "../utils/api"
import axios from "axios"
import UploadFile from "./upload"

const {Option} = Select

const ArticleEdit = (props: any) => {
    const {hasType, back, propsSave, propsPub, info, isPub} = props
    let autoInterval: any = null
    const [title, setTitle] = useState('')
    const [typeId, setTypeId] = useState('')
    const [img, setImg] = useState('')
    const [options, setOptions] = useState([])
    const [hasSave, setHasSave] = useState(false)
    const [content, setContent] = useState('')
    const [lastSaveTime, setLastSaveTime] = useState('')
    const getText = (text: string) => {
        setContent(text)
    }

    const handleChange = (_id: string) => {
        setTypeId(_id)
    }

    const titleChange = (e: any) => {
        setTitle(e.target.value)
    }

    const getImg = (imgSrc: string) => {
        setImg(imgSrc)
    }

    const pub = () => {
        if (judgeNull([title, typeId, img, content])) {
            propsPub({
                title, typeId, img, content,
                status: 1
            })
        } else {
            message.error('请完成所有内容再保存')
        }
    }

    const save = () => {
        setHasSave(true)
        setLastSaveTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
        propsSave({
            title, typeId, img, content,
            status: isPub ? 3 : 2
        })
        clearInterval(autoInterval)
    }

    const autoSave = () => {
        clearInterval(autoInterval)
        autoInterval = setInterval(save, 1000 * 60 * 3)
    }

    const keyDown = (e: any) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            save()
            autoSave()
            e.preventDefault()
        }
    }

    useEffect(() => {
        autoSave()
        hasType && getTypes()
    }, [])

    useEffect(() => {
        const {title = '', typeId = '', img = '', content = ''} = info
        setTitle(title)
        setImg(img)
        setTypeId(typeId)
        setContent(content)
        console.log(title, typeId, img, content)
    }, [info])

    const getTypes = () => {
        handle(axios.get(`/type/list?page=1&pageSize=100`), '获取类型列表', false, true).then((res: any) => {
            setOptions(res.data.data)
        })
    }

    const goBack = () => {
        clearInterval(autoInterval)
        back()
    }

    return (
        <div className={'articleEdit'} onKeyDown={keyDown}>
            <header>
                <Button className={'back'} icon={<IconFont type={'icon-back'}/>} onClick={() => goBack()}>返回列表</Button>
                {hasSave && <div className={'autoSave'}><IconFont type={'icon-zhengque'}/>上次保存于：{lastSaveTime}</div>}
                <Button className={'save'} onClick={() => save()}>保存草稿</Button>
                <Button className={'pub'} onClick={() => pub()}>发布文章</Button>
            </header>
            <div className={'title'}>
                <h2>标题：</h2>
                <div className={'op'}>
                    {
                        hasType && <Select className={'typeSelect'} value={typeId} style={{width: 120}}
                                           onChange={handleChange}>
                            {
                                options.map((item: any, index: number) => {
                                    return <Option value={item._id} key={index}>{item.type}</Option>
                                })
                            }
                        </Select>}
                    <Input value={title} className={'input'} onChange={titleChange}/>
                </div>
            </div>
            <div className={'title img'}>
                <h2>封面图</h2>
                <UploadFile success={getImg} defaultValue={img}/>
            </div>
            <div className={'main'}>
                <MarkdownEdit getText={getText} defaultValue={content}/>
            </div>
        </div>
    )
}

export default ArticleEdit
