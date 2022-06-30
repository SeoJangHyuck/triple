import './statistic.scss'
import triple_award from '@assets/img/intro/triple_award.png'
import playstore from '@assets/img/intro/2018_best_playstore.png'
import appstore from '@assets/img/intro/appstore.png'
import React, { useState, useEffect } from 'react'
export interface statisticCount {
  user: number
  review: number
  calendar: number
}

// 카운트 애니메이션을 위해서 특정 시간에 이벤트가 발생할수 있도록
// time list를 만드는 함수
// 조건: 증가속도가 확 느려지는 효과 구현 (Ease-Out)
// 마지막 1초의 시간 동안 5번의 카운트에서 delay 100ms를 주면서 속도를 확 줄이는 형태
function makeTimingFunction(maxTime: number, maxCount: number) {
  const timeList: number[] = [0]
  let delay = 1
  for (let time = 1; time <= maxTime; time += delay) {
    if (time < maxTime - 1000) {
      delay = (maxTime - 1000) / (maxCount - 5)
    } else {
      delay += 100
    }
    if (time + delay <= maxTime) {
      timeList.push(time)
    }
  }
  timeList.push(maxTime)
  return timeList
}

const maxTime = 2000
const maxCount: statisticCount = {
  user: 700,
  review: 100,
  calendar: 470,
}

const Statistic = () => {
  const [userCount, setUserCount] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [calendarCount, setCalendarCount] = useState(0)

  // 여행자 카운트 애니메이션
  useEffect(() => {
    const timeFuncList: any[] = []
    makeTimingFunction(maxTime, maxCount.user).forEach((time) => {
      const timeOut = setTimeout(() => {
        setUserCount((c) => c + 1)
      }, time)
      timeFuncList.push(timeOut)
    })
    return () => {
      timeFuncList.forEach((timeFunc) => {
        clearTimeout(timeFunc)
      })
    }
  }, [])

  // 여행 리뷰 카운트 애니메이션
  useEffect(() => {
    const timeFuncList: any[] = []
    makeTimingFunction(maxTime, maxCount.review).forEach((time) => {
      const timeOut = setTimeout(() => {
        setReviewCount((c) => c + 1)
      }, time)
      timeFuncList.push(timeOut)
    })
    return () => {
      timeFuncList.forEach((timeFunc) => {
        clearTimeout(timeFunc)
      })
    }
  }, [])

  // 여행 일정 카운트 애니메이션
  useEffect(() => {
    const timeFuncList: any[] = []
    makeTimingFunction(maxTime, maxCount.calendar).forEach((time) => {
      const timeOut = setTimeout(() => {
        setCalendarCount((c) => c + 1)
      }, time)
      timeFuncList.push(timeOut)
    })
    return () => {
      timeFuncList.forEach((timeFunc) => {
        clearTimeout(timeFunc)
      })
    }
  }, [])

  return (
    <div className="statistic">
      <div
        className="statistic_standard"
        style={{
          backgroundImage: `url(${triple_award})`,
        }}
      >
        <p>2021년 12월 기준</p>
      </div>
      <div className="statistic_info">
        <div className="user_info">
          <p>
            <strong>
              <span>{userCount}</span>만 명
            </strong>
            의 여행자
          </p>
          <p>
            <strong>
              <span>{reviewCount}</span>만 개
            </strong>
            의 여행 리뷰
          </p>
          <p>
            <strong>
              <span>{calendarCount}</span>만 개
            </strong>
            의 여행 일정
          </p>
        </div>
        <div className="award_info">
          <div
            className="playstore"
            style={{
              backgroundImage: `url(${playstore})`,
            }}
          >
            <p>
              2018 구글 플레이스토어
              <br />
              올해의 앱 최우수상 수상
            </p>
          </div>
          <div
            className="appstore"
            style={{
              backgroundImage: `url(${appstore})`,
            }}
          >
            <p>
              2018 애플 앱스토어
              <br />
              오늘의 여행앱 선정
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistic
