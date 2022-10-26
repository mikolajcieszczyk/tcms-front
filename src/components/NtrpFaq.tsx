import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function NtrpFaq() {
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <>
      <p className='font-weight-bold text-right'>
        <Badge bg='info cursor-pointer' onClick={handleClick}>
          {' '}
          <span className='cursor-pointer'>What is NTRP scale?</span>{' '}
          <i className='bi bi-mouse2'></i>
        </Badge>
      </p>

      <Offcanvas
        show={show}
        onHide={handleClick}
        placement='end'
        backdrop={false}
        scroll
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>National Tennis Rating Program (NTRP)</h3>
            <p>
              National Tennis Rating Program helps to assess level of tennis
              players and leagues.
            </p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='mb-4'>
            <h3>NTRP 1.0</h3>
            <p>This player is just starting to play tennis.</p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 1.5</h3>
            <p>
              This player has had limited experience with stroke development and
              is still working primarily on getting the ball into play. This
              player is not yet ready to compete.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 2.0</h3>
            <p>
              This player needs on-court experience, with an emphasis on play.
              This player struggles to find an appropriate contact point, needs
              stroke development/lessons and is not yet familiar with basic
              positions for singles and doubles.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 2.5</h3>
            <p>
              This player is learning to judge where the oncoming ball is going
              and how much swing is needed to return it consistently. Movement
              to the ball and recovery are often not efficient. Can sustain a
              backcourt rally of slow pace with other players of similar ability
              and is beginning to develop strokes. This player is becoming more
              familiar with the basic positions for singles and doubles, and is
              ready to play social matches, leagues and low-level tournaments.
              <p className='font-weight-bold'>Potential limitations:</p>
              grip weaknesses; limited swing and inconsistent toss on serve;
              limited transitions to the net.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 3.0</h3>
            <p>
              This player is fairly consistent when hitting medium-paced shots,
              but is not comfortable with all strokes and lacks accuracy when
              trying for directional control, depth, pace or altering distance
              of shots. Most common doubles formation is one up, one back.
              <p className='font-weight-bold'>Potential limitations:</p>
              inconsistency when applying or handling pace; difficulty handling
              shots outside of their strike zone; can be uncomfortable at the
              net.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 3.5</h3>
            <p>
              This player has achieved stroke dependability with directional
              control on moderate shots, but still lacks depth, variety and the
              ability to alter distance of shots. The effective use of lobs,
              overheads, approach shots, and volleys is limited. This player is
              more comfortable at the net, has improved court awareness, and is
              developing teamwork in doubles.
              <p className='font-weight-bold'>Potential limitations:</p>
              Players can generally rally from the baseliner opposite a net
              player. Players at this level may start to utilize mental skills
              related to concentration, tactics and strategy.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 4.0</h3>
            <p>
              This player has dependable strokes with directional control and
              the ability to alter depth of shots on both forehand and backhand
              sides during moderately paced play. This player also has the
              ability to use lobs, overheads, approach shots, and volleys with
              success. This player occasionally forces errors when serving.
              Points may be lost due to impatience. Teamwork in doubles is
              evident.
              <p className='font-weight-bold'>Potential limitations:</p>
              dependable second serve; recognize opportunities to finish points.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 4.5</h3>
            <p>
              This player can vary the use of pace and spins, has effective
              court coverage, can control depth of shots, and is able to develop
              game plans according to strengths and weaknesses. This player can
              hit the first serve with power and accuracy and can place the
              second serve. This player tends to overhit on difficult shots.
              Aggressive net play is common in doubles.
              <p className='font-weight-bold'>Potential limitations:</p>
              points are frequently won off the serve or return of serve; able
              to offset weaknesses; may have a weapon around which their game
              can be built.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 5.0</h3>
            <p>
              This player has good shot anticipation and frequently has an
              outstanding shot or attribute around which his or her game can be
              structured. This player can regularly hit winners or force errors
              off of short balls and puts away volleys. He or she can
              successfully execute lobs, drop shots, half volleys, overheads,
              and has good depth and spin on most second serves.
              <p className='font-weight-bold'>Potential limitations:</p>
              covers and disguises weaknesses well; can hit offensive volleys
              and half-volleys from mid-court; can employ physical or mental
              fitness as a weapon.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 5.5</h3>
            <p>
              This player has developed pace and/or consistency as a major
              weapon. This player can vary strategies and styles of play in
              competitive situations and hit dependable shots in stress
              situations.
              <p className='font-weight-bold'>Potential limitations:</p>
              can hit offensively at any time; can vary strategies and styles of
              play in competitive situations; first and second serves can be
              depended upon in stress situations.
            </p>
          </div>

          <div className='mb-4'>
            <h3>NTRP 6.0-7.0</h3>
            <p>
              The 6.0 player typically has had intensive training for national
              tournaments or top level collegiate competition, and has obtained
              a national ranking.
            </p>

            <p>The 6.5 and 7.0 are world-class players.</p>
          </div>

          <div className='mb-4'>
            <p className='small text-right'>
              Source:{' '}
              <span className='text-italic font-weight-bold'>
                https://opentennis.net/au/ntrp
              </span>
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
