import React, { useState } from 'react';
import { X, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CampusEvent } from '../types';
import confetti from 'canvas-confetti';

interface FeedbackModalProps {
  event: CampusEvent | null;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ event, onClose }) => {
  const { submitFeedback, currentUser } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [orgRating, setOrgRating] = useState(5);
  const [contentRating, setContentRating] = useState(5);
  const [venueRating, setVenueRating] = useState(5);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      eventId: event.id,
      eventTitle: event.title,
      rating,
      categoryRatings: {
        organization: orgRating,
        content: contentRating,
        venue: venueRating
      },
      comments: comments.trim() || 'Great event, very well organized and informative!'
    });

    setIsSubmitted(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => {
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Event Feedback &amp; Review</h3>
              <p className="text-xs text-slate-400">Official Event Review &bull; Quality Evaluation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Feedback Submitted!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you {currentUser.name}! Your ratings and comments help organizers improve upcoming campus events.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-indigo-600 font-bold">
                {event.clubName}
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-0.5">{event.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Held on {event.date} at {event.venue}</p>
            </div>

            {/* Overall Star Rating */}
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Overall Experience Rating
              </label>
              <div className="flex justify-center space-x-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-slate-300 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {rating === 5 && '🌟 Outstanding experience! Highly recommended.'}
                {rating === 4 && '👍 Very good event, enjoyed it!'}
                {rating === 3 && '👌 Average, had some good moments.'}
                {rating === 2 && '👎 Below expectations, needs improvement.'}
                {rating === 1 && '⚠️ Poorly organized or unhelpful.'}
              </p>
            </div>

            {/* Category Ratings */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">Organization</span>
                <select
                  value={orgRating}
                  onChange={(e) => setOrgRating(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1"
                >
                  <option value="5">5/5 - Perfect</option>
                  <option value="4">4/5 - Good</option>
                  <option value="3">3/5 - Okay</option>
                  <option value="2">2/5 - Poor</option>
                </select>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">Content / Speakers</span>
                <select
                  value={contentRating}
                  onChange={(e) => setContentRating(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1"
                >
                  <option value="5">5/5 - High Quality</option>
                  <option value="4">4/5 - Informative</option>
                  <option value="3">3/5 - Standard</option>
                  <option value="2">2/5 - Basic</option>
                </select>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">Venue &amp; Facilities</span>
                <select
                  value={venueRating}
                  onChange={(e) => setVenueRating(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1"
                >
                  <option value="5">5/5 - Excellent</option>
                  <option value="4">4/5 - Comfortable</option>
                  <option value="3">3/5 - Adequate</option>
                  <option value="2">2/5 - Issues</option>
                </select>
              </div>
            </div>

            {/* Written Comments */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>What did you like most? Any suggestions for next time?</span>
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts with the organizing faculty and club leaders..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
