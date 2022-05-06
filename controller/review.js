const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.postReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user.id;
    campground.reviews.push(review)
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully created a review')
    res.redirect(`/campground/${campground.id}`)
}

module.exports.deleteReview = async(req, res) =>{
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/campground/${id}`)
}